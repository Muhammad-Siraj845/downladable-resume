"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get references to the form and resume preview elements
var resumeForm = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var shareSection = document.querySelector('.share-section');
var shareLinkInput = document.getElementById('share-link');
var downloadButton = document.getElementById('download-btn');
// Function to generate the resume preview
function generateResume(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    // Get user input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var degree = document.getElementById('degree').value;
    var school = document.getElementById('school').value;
    var gradYear = document.getElementById('grad-year').value;
    var jobTitle = document.getElementById('job-title').value;
    var company = document.getElementById('company').value;
    var jobDuration = document.getElementById('job-duration').value;
    var skills = document.getElementById('skills').value.split(',');
    // Create resume HTML
    var resumeHTML = "\n      <div class=\"resume-header\">".concat(name, "</div>\n      <p>Email: ").concat(email, " | Phone: ").concat(phone, " | Address: ").concat(address, "</p>\n  \n      <div class=\"resume-section\">\n        <h3>Education</h3>\n        <ul>\n          <li>").concat(degree, ", ").concat(school, " (").concat(gradYear, ")</li>\n        </ul>\n      </div>\n  \n      <div class=\"resume-section\">\n        <h3>Work Experience</h3>\n        <ul>\n          <li>").concat(jobTitle, " at ").concat(company, " (").concat(jobDuration, ")</li>\n        </ul>\n      </div>\n  \n      <div class=\"resume-section\">\n        <h3>Skills</h3>\n        <ul>\n          ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n        </ul>\n      </div>\n    ");
    // Display the resume preview
    resumeOutput.innerHTML = resumeHTML;
    // Display the share section with the unique URL
    var username = "john_doe"; // This should be dynamic or user-provided
    var uniqueURL = "https://".concat(username, ".vercel.app/resume");
    shareLinkInput.value = uniqueURL;
    // Show the share section
    shareSection.style.display = 'block';
}
// Function to download resume as PDF
function downloadPDF() {
    // Access the jsPDF library from window.jspdf
    var jsPDF = window.jspdf.jsPDF;
    // Create a new instance of jsPDF
    var doc = new jsPDF();
    // Add text content to the PDF
    doc.text("Resume", 10, 10); // Title text at position (10, 10)
    doc.text(resumeOutput.innerText, 10, 20); // Add resume content starting at (10, 20)
    // Save the generated PDF
    doc.save('resume.pdf');
}
// Add event listener for form submission
resumeForm.addEventListener('submit', generateResume);
// Add event listener for download button
downloadButton.addEventListener('click', downloadPDF);
