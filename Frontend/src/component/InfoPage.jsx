import React from "react";
import "../css/component/InfoPage.css";

const InfoPage = () => {
  return (
    <div className="InfoPage">
      <h1>🔐 LockNote — The Safest Place for Your Thoughts</h1>
      <p>
        <strong>LockNote</strong> is a free online notepad with password
        protection — designed to keep your notes secure, organized, and
        accessible from anywhere. Unlike traditional notepads, LockNote gives
        you the power to create and manage encrypted <strong>notes</strong>,{" "}
        <strong>folders</strong>, and <strong>files</strong> — all without
        registration, tracking, or ads.
      </p>

      <h2>✨ Why LockNote?</h2>
      <ul>
        <li>🔑 End-to-end encryption — zero knowledge</li>
        <li>📝 Create unlimited encrypted notes</li>
        <li>📁 Organize your content with folders</li>
        <li>📄 Create and manage files inside folders</li>
        <li>🗑️ Instantly delete notes, files & folders</li>
        <li>⚡ Fast, secure & account-free access</li>
      </ul>

      <h2>🔒 Trustless Security</h2>
      <p>
        Your password <strong>never</strong> leaves your device. We only store{" "}
        <strong>encrypted content</strong> on our servers — so not even we can
        read your notes. LockNote is built on the principle of{" "}
        <em>“trust no one, verify everything”</em>.
      </p>
      <p>
        No registration. No sessions. No ads. No trackers. Just your private
        notes.
      </p>

      <h2>🛡️ How it Works</h2>
      <ul>
        <li>🔐 Your password is never stored or transmitted.</li>
        <li>
          🧠 Only encrypted text is sent to the server — we can’t decrypt your
          notes even if we wanted to.
        </li>
        <li>🚫 No cookies, no trackers, no third parties.</li>
        <li>💻 Access from any browser, on any device.</li>
      </ul>

      <h2>❓ FAQ</h2>

      <h3>Q: I forgot my password. Can I recover my notes?</h3>
      <p>
        A: No. Since we never store your password, your encrypted notes cannot
        be decrypted without it.
      </p>

      <h3>Q: How can I back up my encrypted notes?</h3>
      <p>
        A: Simply save the page (Ctrl + S) while the password dialog is visible.
        Open the saved file anytime and enter your password to access your
        content.
      </p>

      <h3>Q: Can I make a note or folder public?</h3>
      <p>
        A: Yes, you can share a URL like{" "}
        <code>locknote.app/yourSite?yourPassword</code> to allow automatic
        decryption.
      </p>

      <h3>Q: How secure is it?</h3>
      <p>
        A: If someone wants your text, they need your password and must also
        know your site name. Without both, your data remains encrypted and
        unreadable.
      </p>

      <h2>🚨 Important Notice</h2>
      <p>
        Always make sure the URL in your browser is exactly{" "}
        <strong>locknote.app</strong>. Scammers may try to copy our interface to
        steal passwords. Never enter your credentials on fake sites.
      </p>

      <h2>⚖️ Our Promise</h2>
      <p>
        LockNote has never shared or surrendered any user data — and we couldn’t
        even if we wanted to. We can’t access your notes. That’s the power of
        trustless encryption.
      </p>

      <footer>
        © 2025 LockNote — Simple. Secure. Free. No Ads. No Tracking.
      </footer>
    </div>
  );
};

export default InfoPage;
