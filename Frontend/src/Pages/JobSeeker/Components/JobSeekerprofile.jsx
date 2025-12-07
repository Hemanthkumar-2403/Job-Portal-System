import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    updateJobseekerInfoApi,
    uploadJobseekerProfilePicApi,
    uploadJobseekerResumeApi,
} from "../../../redux/JobSeekerSlice";
import { updateUserInfo } from "../../../redux/authSlice";
import { validateJobseekerField } from "./Validation";

function JobseekerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.jobseeker);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    education: "",
    graduationYear: "",
    experience: "",
    skills: "",
    profilePic: "",
    resume: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (user && user.jobseeker) {
      setFormData({
        education: user.jobseeker.education || "",
        graduationYear: user.jobseeker.graduationYear || "",
        experience: user.jobseeker.experience || "",
        skills: user.jobseeker.skills?.join(", ") || "",
        profilePic: user.profilePic || "",
        resume: user.jobseeker.resume || "",
        phone: user.jobseeker.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const msg = validateJobseekerField(name, value, {
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile picture must be less than 2 MB");
      return;
    }

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG allowed");
      return;
    }

    setProfilePicFile(file);
    setErrors((prev) => ({ ...prev, profilePic: "" }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be less than 5 MB");
      return;
    }

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, DOC, DOCX files allowed");
      return;
    }

    setResumeFile(file);
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateJobseekerField(key, formData[key], formData);
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg)) return;

    try {
      let profilePicURL = formData.profilePic;
      let resumeURL = formData.resume;

      if (profilePicFile) {
        const fd = new FormData();
        fd.append("image", profilePicFile);
        const res = await dispatch(uploadJobseekerProfilePicApi(fd));
        profilePicURL = res?.payload?.fileUrl || profilePicURL;
      }

      if (resumeFile) {
        const fd = new FormData();
        fd.append("resume", resumeFile);
        const res = await dispatch(uploadJobseekerResumeApi(fd));
        resumeURL = res?.payload?.fileUrl || resumeURL;
      }

      const payload = {
        education: formData.education,
        graduationYear: formData.graduationYear,
        experience: formData.experience,
        skills: formData.skills.split(",").map((s) => s.trim()),
        profilePic: profilePicURL,
        resume: resumeURL,
        phone: formData.phone,
         profileCompleted: true

        
      };

      const response = await dispatch(updateJobseekerInfoApi(payload));
      dispatch(updateUserInfo( response.payload));

      toast.success("Jobseeker profile updated!");
      navigate("/jobseeker/dashboard");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-4">
          Complete Your Jobseeker Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Phone Number *</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="9876543210"
              maxLength={10}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4 text-center">
            <label className="block font-medium mb-2">Profile Picture *</label>

            {profilePicFile ? (
              <img
                src={URL.createObjectURL(profilePicFile)}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
              />
            ) : formData.profilePic ? (
              <img
                src={formData.profilePic}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2"></div>
            )}

            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {errors.profilePic && (
              <p className="text-red-500 text-sm">{errors.profilePic}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Education *</label>
            <input
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Graduation Year *</label>
            <input
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm">{errors.graduationYear}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Experience *</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select experience</option>
              <option value="0">Fresher (0 Years)</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3-5">3–5 Years</option>
              <option value="5-8">5–8 Years</option>
              <option value="8+">8+ Years</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-sm">{errors.experience}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Skills *</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="HTML, CSS, JavaScript"
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Resume *</label>

            {formData.resume && !resumeFile && (
              <a href={formData.resume} target="_blank" className="text-blue-600 underline text-sm">
                View existing resume
              </a>
            )}

            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
            {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobseekerProfile;
