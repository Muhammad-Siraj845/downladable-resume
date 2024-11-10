// Declare the jsPDF library globally for TypeScript\
// app.ts (ensuring the file is treated as a module)
import {} from 'jspdf';  // This will treat the file as a module

declare global {
    interface Window {
      jspdf: any;
    }
  }
  
  // Get references to the form and resume preview elements
  const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
  const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
  const shareSection = document.querySelector('.share-section') as HTMLElement;
  const shareLinkInput = document.getElementById('share-link') as HTMLInputElement;
  const downloadButton = document.getElementById('download-btn') as HTMLButtonElement;
  
  // Function to generate the resume preview
  function generateResume(event: Event): void {
    event.preventDefault();  // Prevent the form from submitting and reloading the page
  
    // Get user input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
  
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const gradYear = (document.getElementById('grad-year') as HTMLInputElement).value;
  
    const jobTitle = (document.getElementById('job-title') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const jobDuration = (document.getElementById('job-duration') as HTMLInputElement).value;
  
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
  
    // Create resume HTML
    const resumeHTML = `
      <div class="resume-header">${name}</div>
      <p>Email: ${email} | Phone: ${phone} | Address: ${address}</p>
  
      <div class="resume-section">
        <h3>Education</h3>
        <ul>
          <li>${degree}, ${school} (${gradYear})</li>
        </ul>
      </div>
  
      <div class="resume-section">
        <h3>Work Experience</h3>
        <ul>
          <li>${jobTitle} at ${company} (${jobDuration})</li>
        </ul>
      </div>
  
      <div class="resume-section">
        <h3>Skills</h3>
        <ul>
          ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
        </ul>
      </div>
    `;
  
    // Display the resume preview
    resumeOutput.innerHTML = resumeHTML;
  
    // Display the share section with the unique URL
    const username = "john_doe";  // This should be dynamic or user-provided
    const uniqueURL = `https://${username}.vercel.app/resume`;
    shareLinkInput.value = uniqueURL;
  
    // Show the share section
    shareSection.style.display = 'block';
  }
  
  // Function to download resume as PDF
  function downloadPDF(): void {
    // Access the jsPDF library from window.jspdf
    const { jsPDF } = window.jspdf;
  
    // Create a new instance of jsPDF
    const doc = new jsPDF();
  
    // Add text content to the PDF
    doc.text("Resume", 10, 10);  // Title text at position (10, 10)
    doc.text(resumeOutput.innerText, 10, 20);  // Add resume content starting at (10, 20)
  
    // Save the generated PDF
    doc.save('resume.pdf');
  }
  
  // Add event listener for form submission
  resumeForm.addEventListener('submit', generateResume);
  
  // Add event listener for download button
  downloadButton.addEventListener('click', downloadPDF);
  