document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const resumeContent = document.getElementById('resumeContent');
    const resumeOutput = document.getElementById('resumeOutput');
    const inputForm = document.getElementById('inputForm');

    // Add experience section
    function addExperience() {
        const experienceList = document.getElementById('experienceList');
        const newExperience = document.createElement('div');
        newExperience.classList.add('experienceItem');
        newExperience.innerHTML = `
            <label>Job Title:</label>
            <input type="text" class="expTitle" required>
            <label>Company:</label>
            <input type="text" class="expCompany" required>
            <label>Dates:</label>
            <input type="text" class="expDates" required>
            <label>Description:</label>
            <textarea class="expDesc" required></textarea>
            <button type="button" class="removeExperience">Remove</button>
        `;
        experienceList.appendChild(newExperience);

        // Remove experience item
        newExperience.querySelector('.removeExperience').addEventListener('click', () => {
            experienceList.removeChild(newExperience);
        });
    }

    // Add education section
    function addEducation() {
        const educationList = document.getElementById('educationList');
        const newEducation = document.createElement('div');
        newEducation.classList.add('educationItem');
        newEducation.innerHTML = `
            <label>Degree:</label>
            <input type="text" class="eduDegree" required>
            <label>Institution:</label>
            <input type="text" class="eduInstitution" required>
            <label>Year:</label>
            <input type="text" class="eduYear" required>
            <button type="button" class="removeEducation">Remove</button>
        `;
        educationList.appendChild(newEducation);

        // Remove education item
        newEducation.querySelector('.removeEducation').addEventListener('click', () => {
            educationList.removeChild(newEducation);
        });
    }

    // Add skill input
    function addSkill() {
        const skillsList = document.getElementById('skillsList');
        const newSkill = document.createElement('input');
        newSkill.type = 'text';
        newSkill.classList.add('skill');
        newSkill.placeholder = 'Skill';
        skillsList.appendChild(newSkill);
    }

    // Add event listeners to buttons
    document.getElementById('addExperience').addEventListener('click', addExperience);
    document.getElementById('addEducation').addEventListener('click', addEducation);
    document.getElementById('addSkill').addEventListener('click', addSkill);

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get input values
        const name = document.getElementById('name').value;
        const tagline = document.getElementById('tagline').value;

        // Get experience data
        const experiences = Array.from(document.querySelectorAll('.experienceItem')).map(item => ({
            title: item.querySelector('.expTitle').value,
            company: item.querySelector('.expCompany').value,
            dates: item.querySelector('.expDates').value,
            description: item.querySelector('.expDesc').value
        }));

        // Get education data
        const educations = Array.from(document.querySelectorAll('.educationItem')).map(item => ({
            degree: item.querySelector('.eduDegree').value,
            institution: item.querySelector('.eduInstitution').value,
            year: item.querySelector('.eduYear').value
        }));

        // Get skills data
        const skills = Array.from(document.querySelectorAll('.skill')).map(skill => skill.value).filter(value => value.trim() !== '');

        // Generate resume content
        resumeContent.innerHTML = `
            <header>
                <h1>${name}</h1>
                <p>${tagline}</p>
            </header>
            <section id="experience">
                <h2>Experience</h2>
                ${experiences.map(exp => `
                    <div>
                        <h3>${exp.title} at ${exp.company}</h3>
                        <p>${exp.dates}</p>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </section>
            <section id="education">
                <h2>Education</h2>
                ${educations.map(edu => `
                    <div>
                        <h3>${edu.degree}</h3>
                        <p>${edu.institution}</p>
                        <p>${edu.year}</p>
                    </div>
                `).join('')}
            </section>
            <section id="skills">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>
        `;

        resumeOutput.style.display = 'block';
        inputForm.style.display = 'none';
    });

    // Enable editing of the resume
    document.getElementById('editResume').addEventListener('click', () => {
        resumeOutput.style.display = 'none';
        inputForm.style.display = 'block';
    });

    // Download resume functionality
    document.getElementById('downloadResume').addEventListener('click', () => {
        const blob = new Blob([resumeContent.innerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    });
});
