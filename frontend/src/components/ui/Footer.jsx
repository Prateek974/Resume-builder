import React from 'react';
const Footer = () => {
    return (
        <footer>
            <hr />
            <section>
                <div>
                    <h3>SmartResume AI</h3>
                    <p>AI-powered resume builder for modern professionals.</p>
                </div>

                <nav>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/editor">Editor</a></li>
                        <li><a href="/contact">Contact</a></li>

                    </ul>
                </nav>
                <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

            </section>
            <hr />
      
        </footer >

    );
};
export default Footer;