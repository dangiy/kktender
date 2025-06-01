'use client';

import { useState } from 'react';

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    experience: [{ company: '', role: '', duration: '', description: '' }],
    skills: [''],
    projects: [{ name: '', description: '', technologies: [''] }],
    achievements: ['']
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-candidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Application submitted successfully!');
        // Reset form or redirect
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], field === 'experience' ? 
        { company: '', role: '', duration: '', description: '' } :
        field === 'projects' ? 
        { name: '', description: '', technologies: [''] } : '']
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Candidate Application Form</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Scholar Number</label>
          <input
            type="text"
            value={formData.scholarNumber || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, scholarNumber: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">College</label>
          <input
            type="text"
            value={formData.college || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Graduation Year</label>
          <input
            type="number"
            value={formData.graduationYear || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: parseInt(e.target.value) }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Experience</h3>
          {formData.experience?.map((exp, index) => (
            <div key={index} className="p-4 border rounded space-y-4">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...(formData.experience || [])];
                  newExp[index] = { ...newExp[index], company: e.target.value };
                  setFormData(prev => ({ ...prev, experience: newExp }));
                }}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => {
                  const newExp = [...(formData.experience || [])];
                  newExp[index] = { ...newExp[index], role: e.target.value };
                  setFormData(prev => ({ ...prev, experience: newExp }));
                }}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => {
                  const newExp = [...(formData.experience || [])];
                  newExp[index] = { ...newExp[index], duration: e.target.value };
                  setFormData(prev => ({ ...prev, experience: newExp }));
                }}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...(formData.experience || [])];
                  newExp[index] = { ...newExp[index], description: e.target.value };
                  setFormData(prev => ({ ...prev, experience: newExp }));
                }}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('experience')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          {formData.skills?.map((skill, index) => (
            <input
              key={index}
              type="text"
              value={skill}
              onChange={(e) => {
                const newSkills = [...(formData.skills || [])];
                newSkills[index] = e.target.value;
                setFormData(prev => ({ ...prev, skills: newSkills }));
              }}
              className="w-full p-2 border rounded"
              placeholder="Skill"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('skills')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          {formData.projects?.map((project, index) => (
            <div key={index} className="p-4 border rounded space-y-4">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => {
                  const newProjects = [...(formData.projects || [])];
                  newProjects[index] = { ...newProjects[index], name: e.target.value };
                  setFormData(prev => ({ ...prev, projects: newProjects }));
                }}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...(formData.projects || [])];
                  newProjects[index] = { ...newProjects[index], description: e.target.value };
                  setFormData(prev => ({ ...prev, projects: newProjects }));
                }}
                className="w-full p-2 border rounded"
              />
              <div className="space-y-2">
                {project.technologies.map((tech, techIndex) => (
                  <input
                    key={techIndex}
                    type="text"
                    placeholder="Technology"
                    value={tech}
                    onChange={(e) => {
                      const newProjects = [...(formData.projects || [])];
                      newProjects[index].technologies[techIndex] = e.target.value;
                      setFormData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    className="w-full p-2 border rounded"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newProjects = [...(formData.projects || [])];
                    newProjects[index].technologies.push('');
                    setFormData(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Add Technology
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('projects')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>

        {/* Achievements Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          {formData.achievements?.map((achievement, index) => (
            <input
              key={index}
              type="text"
              value={achievement}
              onChange={(e) => {
                const newAchievements = [...(formData.achievements || [])];
                newAchievements[index] = e.target.value;
                setFormData(prev => ({ ...prev, achievements: newAchievements }));
              }}
              className="w-full p-2 border rounded"
              placeholder="Achievement"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('achievements')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Achievement
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit Application
      </button>
    </form>
  );
} 