import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="m-[65px] p-6  rounded-2xl">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">
                Laminar General Trading L.L.C is committed to protecting your
                privacy. This Privacy Policy outlines how we collect, use,
                disclose, and safeguard your personal information when you
                interact with our services.
            </p>

            <h2 className="text-xl font-semibold mt-4">
                1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
                <li>
                    Personal Information: Name, email, phone number, and other
                    contact details.
                </li>
                <li>
                    Service Usage Data: Maintenance schedules and interactions
                    with our team.
                </li>
                <li>Communication Records: Emails, inquiries, and feedback.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">
                2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
                <li>
                    To provide and manage indoor plant maintenance services.
                </li>
                <li>To process payments and issue invoices.</li>
                <li>To communicate regarding service updates.</li>
                <li>To improve services based on feedback.</li>
                <li>To comply with legal obligations.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">
                3. Sharing of Information
            </h2>
            <p className="text-gray-700">
                We do not sell, rent, or trade personal data. Information may be
                shared:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
                <li>
                    With service providers (e.g., payment processing, IT
                    support).
                </li>
                <li>For legal compliance.</li>
                <li>With business partners for service execution.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">4. Data Security</h2>
            <p className="text-gray-700">
                We implement security measures to protect your personal data,
                though no online transmission is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-4">5. Data Retention</h2>
            <p className="text-gray-700">
                We retain personal data as long as necessary to fulfill
                obligations and legal requirements.
            </p>

            <h2 className="text-xl font-semibold mt-4">6. Your Rights</h2>
            <p className="text-gray-700">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700">
                <li>Access, correct, or delete your data.</li>
                <li>Object to processing under certain conditions.</li>
                <li>Withdraw consent where applicable.</li>
            </ul>
            <p className="text-gray-700">
                To exercise your rights, contact us at{" "}
                <a
                    href="mailto:contact@desireign.com"
                    className="text-blue-500 underline"
                >
                    contact@desireign.com
                </a>
                .
            </p>

            <h2 className="text-xl font-semibold mt-4">
                7. Changes to This Policy
            </h2>
            <p className="text-gray-700">
                We may update this policy periodically. Changes will be posted
                with the updated date.
            </p>

            <h2 className="text-xl font-semibold mt-4">
                8. Contact Information
            </h2>
            <p className="text-gray-700">For any questions, contact us:</p>
            <ul className="list-disc pl-6 text-gray-700">
                <li>
                    <strong>Desireign</strong>
                </li>
                <li>
                    Email:{" "}
                    <a
                        href="mailto:contact@desireign.com"
                        className="text-blue-500 underline"
                    >
                        contact@desireign.com
                    </a>
                </li>
                <li>Phone: +971 56 345 3398</li>
                <li>Address: Alqous 3, Dubai, UAE</li>
            </ul>

            <p className="text-gray-500 mt-4">Last Updated: 4/2/25</p>
        </div>
    );
};

export default PrivacyPolicy;
