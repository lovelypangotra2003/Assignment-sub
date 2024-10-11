import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

        const newUser = await User.create({ username, password: hashedPassword, role: 'User' });
        if (newUser){
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({ 
                _id : newUser._id,
                username : newUser.username,
                role : newUser.role
            });
        }
        else {
			res.status(422).json({ error: "Invalid user data" });
		}

    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Register as an Admin
export const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}
        const newAdmin = await User.create({ username, password: hashedPassword, role: 'Admin' });

        if (newAdmin){
            generateTokenAndSetCookie(newAdmin._id, res);
            res.status(201).json({ 
                _id : newAdmin._id,
                username : newAdmin.username,
                role : newAdmin.role
            });
        }
        else {
			res.status(422).json({ error: "Invalid admin data" });
		}


    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(400).json({ error: 'Failed to register admin' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, role: 'User'});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
        const token = generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            token,
            user: {
            _id: user._id,
			username: user.username,
			role : user.role}
		});
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, role: 'Admin' });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
			token,
            user: {
            _id: user._id,
			username: user.username,
			role : user.role}
		});
        // if (!user || !(await bcrypt.compare(password, user.password))) {
        //     return res.status(400).json({ error: 'Invalid credentials' });
        // }
        // const token = jwt.sign({ userId: user._id, role: user.role }, 'SECRET_KEY');
        // res.json({ token });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: 'Login failed' });
    }
};

// New function to get all admins
export const getAllAdmins = async (req, res) => {
    try {
        // Fetch all users with role 'Admin'
        const admins = await User.find({ role: 'Admin' }, 'username'); // Only return usernames
        if (!admins || admins.length === 0) {
            return res.status(404).json({ error: 'No admins found' });
        }
        res.status(200).json(admins);
    } catch (error) {
        console.log("Error fetching admins:", error.message);
        res.status(500).json({ error: 'Failed to retrieve admins' });
    }
};