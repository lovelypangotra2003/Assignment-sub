import Assignment  from "../models/assignmentModel.js";
import User from "../models/userModel.js";

export const uploadAssignment = async (req, res) => {
    try {
        // Extract logged-in user info
        const userId = req.user._id; // Assuming req.user contains logged-in user info
        if (req.user.role === 'Admin') {
            return res.status(403).json({ message: 'Admins are not allowed to upload assignments' });
        }
        // const userId = req.user.userId;
        const { task, admin } = req.body;

        // Find the admin by the name
        const adminUser = await User.findOne({ username: admin, role: 'Admin' });
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Create the assignment and associate it with the logged-in user and the admin
        const newAssignment = await Assignment.create({
            userId, // Using logged-in user
            task,
            admin: adminUser._id // Store the admin's ID
        });

        res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ message: 'Error uploading assignment', error });
    }
};


export const viewAssignments = async (req, res) => {
    try {
        // Ensure that only admins can access this endpoint
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        // Fetch all assignments tagged to the authenticated admin
        const assignments = await Assignment.find({ admin: req.user._id })
            .populate('userId', 'username')  // Populate userId with username
            .exec();

        // Check if assignments exist
        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this admin.' });
        }

        // Send the assignments back to the client
        res.status(200).json( { message: 'Assignment accepted successfully', assignments } );
    } catch (error) {
        console.log('Error retrieving assignments:', error.message);
        res.status(500).json({ error: 'Failed to retrieve assignments' });
    }
};

export const acceptAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;

        // Fetch the assignment by ID
        const assignment = await Assignment.findById(assignmentId);

        // Check if the assignment exists
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Ensure that the logged-in admin is authorized to accept this assignment
        if (assignment.admin.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to accept this assignment' });
        }

        // Update the assignment's status to 'Accepted'
        assignment.status = 'Accepted';
        await assignment.save();

        // Return the updated assignment
        res.status(200).json({
            message: 'Assignment accepted successfully',
            assignment
        });
    } catch (error) {
        console.error('Error accepting assignment:', error.message);
        res.status(500).json({ error: 'Failed to accept assignment' });
    }
};


export const rejectAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;

        // Fetch the assignment by ID
        const assignment = await Assignment.findById(assignmentId);

        // Check if the assignment exists
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Ensure that the logged-in admin is authorized to reject this assignment
        if (assignment.admin.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to reject this assignment' });
        }

        // Update the assignment's status to 'Rejected'
        assignment.status = 'Rejected';
        await assignment.save();

        // Return the updated assignment
        res.status(200).json({
            message: 'Assignment rejected successfully',
            assignment
        });
    } catch (error) {
        console.error('Error rejecting assignment:', error.message);
        res.status(500).json({ error: 'Failed to reject assignment' });
    }
};
