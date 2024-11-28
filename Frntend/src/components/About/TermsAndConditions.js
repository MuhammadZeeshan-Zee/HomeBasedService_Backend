import React from "react";
import Hero from "../../common/Hero";
import BlogImage from "../../assests/images/terms.jpg";

import Footer from "../../common/Footer"; // Assuming Footer is a shared component

function TermsAndConditions() {
    return (
        <>
            <Hero text="Terms" text1="& Conditions" image={BlogImage} />
       
            <div className="bg-gray-50 min-h-screen flex flex-col">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl text-center text-gray-800 font-bold my-8">Terms and Conditions</h1>
                    <p className="text-lg mt-2">
                        Effective Date: November 27, 2024
                    </p>
                </div>

                {/* Content */}
                <div className="flex-grow p-6 md:p-12">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                            Welcome to Service at Door!
                        </h2>
                        <p className="text-neutral-600 mb-4">
                            These terms and conditions outline the rules and regulations for the use of Service at Door's Website and Services.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            1. Acceptance of Terms
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            By accessing our website or using our services, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our services.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            2. Services Offered
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            Service at Door provides home services such as cleaning, plumbing, electrical maintenance, and other similar offerings. The details of each service will be specified at the time of booking.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            3. User Responsibilities
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            - Ensure the information provided during booking is accurate. <br />
                            - Make payments promptly through the approved payment methods. <br />
                            - Comply with any safety instructions provided by our team.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            4. Cancellations and Refunds
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            Cancellation policies may vary depending on the service. Refunds will be processed according to our cancellation guidelines provided during booking.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            5. Limitation of Liability
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            Service at Door is not liable for any damages or losses incurred during or after the provision of services, except as required by law.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            6. Changes to Terms
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            We reserve the right to update or change these terms at any time. Changes will be posted on this page, and your continued use of the service implies acceptance of the updated terms.
                        </p>

                        <h3 className="text-xl font-semibold text-neutral-800 mt-6">
                            7. Contact Information
                        </h3>
                        <p className="text-neutral-600 mt-2">
                            If you have any questions about these terms, please contact us at:
                        </p>
                        <p className="text-neutral-600 mt-2 font-medium">
                            Email: support@serviceatdoor.com <br />
                            Phone: +92-123-4567890
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>

</>
        
    );
}

export default TermsAndConditions;
