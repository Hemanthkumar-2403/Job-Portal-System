const Job =require("../../models/Job")
// POST /api/jobs
const postJob = async (req, res) => {
  try {
    const { title, company, location, salary, description, skills } = req.body;
    const employerId = req.user.id; // from middleware (decoded JWT)

    if (!title || !company || !location || !description || !skills) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      description,
      skills,
      createdBy: employerId,
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = postJob;
