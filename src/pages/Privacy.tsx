import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './Privacy.css';

export function Privacy() {
  useTheme(); // Initialize theme

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Navigation */}
      <nav>
        <div className="nav-inner">
          <Link to="/" className="logo">
            <img
              src="/glid-logo-white.png"
              alt="Glid"
              className="logo-svg logo-dark"
            />
            <img
              src="/glid-logo-black.png"
              alt="Glid"
              className="logo-svg logo-light"
            />
          </Link>
          <div className="nav-actions">
            <Link to="/" className="btn-ghost">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="legal-page">
        <article className="legal-content">
          <header className="legal-header">
            <Link to="/" className="back-link">&larr; Back to Home</Link>
            <h1 className="display-large">Privacy Policy</h1>
            <p className="legal-meta">Last updated: January 30, 2026</p>
          </header>

          <section className="legal-section">
            <h2>Introduction</h2>
            <p>
              Glid ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our
              mobile application and website (collectively, the "Service").
            </p>
            <p>
              By using the Service, you agree to the collection and use of
              information in accordance with this policy. If you do not
              agree with our policies and practices, do not use the
              Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>Information We Collect</h2>

            <h3>Information You Provide</h3>
            <ul>
              <li>
                <strong>Account Information:</strong> When you create an account,
                we collect your name, email address, and profile information
                (such as sports preferences, skill level, and profile photo).
              </li>
              <li>
                <strong>Session Data:</strong> Information about sports sessions
                you create or join, including sport type, location, date,
                time, and participant preferences.
              </li>
              <li>
                <strong>Communications:</strong> Messages you send through
                our in-app chat feature.
              </li>
              <li>
                <strong>Feedback:</strong> Ratings and reviews you provide
                about other players and sessions.
              </li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li>
                <strong>Location Data:</strong> With your permission, we collect
                precise location data to show you nearby sessions and enable
                location-based features.
              </li>
              <li>
                <strong>Device Information:</strong> Device type, operating
                system, unique device identifiers, and mobile network information.
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with the Service,
                including features used, sessions viewed, and time spent in
                the app.
              </li>
              <li>
                <strong>Log Data:</strong> IP address, browser type, pages
                visited, and crash reports.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the Service</li>
              <li>Match you with relevant sports sessions and players</li>
              <li>
                Calculate and display Match (skill) and Vibes (reliability) scores
              </li>
              <li>Enable communication between users</li>
              <li>
                Send you notifications about sessions, matches, and messages
              </li>
              <li>
                Personalize your experience with Top Picks and recommendations
              </li>
              <li>
                Detect and prevent fraud, abuse, and security issues
              </li>
              <li>
                Analyze usage patterns to improve our algorithms and features
              </li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Information Sharing</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li>
                <strong>With Other Users:</strong> Your profile information,
                Match and Vibes scores, and session participation are visible
                to other users as part of the Service's core functionality.
              </li>
              <li>
                <strong>Service Providers:</strong> We work with third-party
                companies to provide cloud hosting, analytics, and other services.
                These providers only have access to information needed to
                perform their functions.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information
                if required by law, court order, or government request.
              </li>
              <li>
                <strong>Safety:</strong> We may share information to protect
                the safety, rights, or property of Glid, our users, or the
                public.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets, your information may
                be transferred to the acquiring entity.
              </li>
            </ul>
            <p>
              We do not sell your personal information to third parties
              for advertising purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>Data Retention</h2>
            <p>
              We retain your information for as long as your account is
              active or as needed to provide you the Service. You can
              request deletion of your account and associated data at any
              time through the app settings or by contacting us.
            </p>
            <p>
              We may retain certain information for legitimate business
              purposes or as required by law, such as fraud prevention and
              compliance with legal obligations.
            </p>
          </section>

          <section className="legal-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational
              measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
              These measures include:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or
              electronic storage is 100% secure. While we strive to
              protect your information, we cannot guarantee absolute
              security.
            </p>
          </section>

          <section className="legal-section">
            <h2>Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have the following rights:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of the personal information
                we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Request that we correct inaccurate
                or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> Request that we delete your personal
                information.
              </li>
              <li>
                <strong>Portability:</strong> Request a copy of your data
                in a portable format.
              </li>
              <li>
                <strong>Opt-out:</strong> Opt out of certain data processing
                activities.
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at{' '}
              <a href="mailto:contact@glid.app">contact@glid.app</a>.
            </p>

            <h3>Location Data</h3>
            <p>
              You can enable or disable location services through your
              device settings. Note that disabling location services will
              limit certain features of the Service.
            </p>

            <h3>Push Notifications</h3>
            <p>
              You can manage push notification preferences in the app
              settings or through your device settings.
            </p>
          </section>

          <section className="legal-section">
            <h2>Children's Privacy</h2>
            <p>
              The Service is not intended for users under the age of 18.
              We do not knowingly collect personal information from
              children under 18. If we learn that we have collected
              personal information from a child under 18, we will take
              steps to delete that information.
            </p>
          </section>

          <section className="legal-section">
            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in
              countries other than your country of residence. These
              countries may have different data protection laws. By using
              the Service, you consent to the transfer of your information
              to these countries.
            </p>
            <p>
              We take appropriate safeguards to ensure your information
              receives adequate protection in accordance with this Privacy
              Policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites or
              services. We are not responsible for the privacy practices
              of these third parties. We encourage you to review their
              privacy policies before providing any personal information.
            </p>
          </section>

          <section className="legal-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy
              on this page and updating the "Last updated" date. We
              encourage you to review this Privacy Policy periodically.
            </p>
            <p>
              Your continued use of the Service after any changes
              constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our
              data practices, please contact us:
            </p>
            <ul className="contact-list">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@glid.app">contact@glid.app</a>
              </li>
              <li>
                <strong>Address:</strong> Glid, Inc., [Address to be added]
              </li>
            </ul>
          </section>

          <footer className="legal-footer">
            <Link to="/" className="btn-ghost">&larr; Back to Home</Link>
          </footer>
        </article>
      </main>
    </>
  );
}
