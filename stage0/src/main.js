import "./style.css";
import "./time.js";

document.querySelector("#app").innerHTML = `
    <div class="container">
      <div class="profile-card">
        <img 
          data-testid="profilePicture"
          src="/franky.jpeg" 
          alt="Profile Picture" 
          class="profile-picture"
        />
        <h1 data-testid="fullName">Franklin Ejezie</h1>
        <h2 data-testid="jobTitle">Senior Web Developer</h2>
        <p data-testid="shortBio">
          Passionate software developer with expertise in frontend development.
          Committed to creating elegant solutions. Always
          learning and exploring new technologies to stay at the forefront of
          innovation.
        </p>
        <p data-testid="currentLocation">
          <i class="fas fa-map-marker-alt"></i> Lagos, Nigeria
        </p>
        <p data-testid="emailAddress">
          <i class="fas fa-envelope"></i> ejeziefranklin@gmail.com
        </p>
        <div data-testid="socialLinks" class="social-links">
          <a href="https://github.com/FrankiePower" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://x.com/FrankyEjezie" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
        <h4 id="utc-time">Loading UTC Time...</h4>
      </div>
    </div>   
`;

setupCounter(document.querySelector("#counter"));
