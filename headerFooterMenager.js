
// JavaScript për të përfshirë përmbajtjen e header-it nga template
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        const template = document.createElement('template');
        template.innerHTML = data.trim();
        document.getElementById('header-placeholder').appendChild(template.content);
    });



// Thirret funksioni për të ngarkuar header-in kur faqja është e ngarkuar plotësisht
// document.addEventListener('DOMContentLoaded', loadHeader);



fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const template = document.createElement('template');
        template.innerHTML = data.trim();
        document.getElementById('footer-placeholder').appendChild(template.content);
    });