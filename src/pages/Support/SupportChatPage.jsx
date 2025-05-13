import { useEffect, useRef, useState } from "react";
import { ImAttachment } from "react-icons/im";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosBase from "../../axios";
import { BtnLoader, PageLoader } from "../../components";
import { config } from "../../constants";
import { useImageChange } from "../../hooks";
import { format } from "date-fns";

const SupportChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { image, handleImageChange, error, setError, setImage } =
        useImageChange();

    const handleRemoveImage = () => {
        setImage(null); // Remove the selected image by setting the state to null
    };
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const { id } = useParams();
    const scrollContainerRef = useRef(null);
    const jwtToken = localStorage.getItem("jwtToken");

    const handleSendMessage = async (e) => {
        if (newMessage.trim() || image) {
            const messageData = {
                message: newMessage.trim(),
                image: image,
            };

            e.preventDefault();
            setIsLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("message", messageData?.message);
            formData.append("image", messageData?.image);

            let response = await axiosBase.patch(
                `/supports/message/update/${id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            setMessages((prev) => [
                ...prev,
                { ...response.data?.data, image: messageData?.image },
            ]);

            setNewMessage("");
            setImage(null); // Optionally clear the image after sending
            setIsLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(
                `/supports/message/all/${id}`,
                {
                    headers: { authorization: `Bearer ${jwtToken}` },
                }
            );

            setMessages(response.data?.messages);

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            console.log(
                scrollContainerRef.current,
                "scrollContainerRef.current"
            );
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        fetchMessages();
    }, []);
    return (
        <div className=" pt-[80px] md:pt-[100px]  flex flex-col bg-mainBg md:px-10  px-3 md:mx-10 lg:mx-20">
            <header className="bg-customGray text-white p-4">
                <h1 className="text-2xl font-bold">Chat with Support</h1>
            </header>

            {isPageLoading ? (
                <PageLoader />
            ) : (
                <>
                    {" "}
                    <main
                        ref={scrollContainerRef}
                        className="flex-grow p-6 overflow-y-auto bg-white  h-[50vh] md:h-[60vh] "
                    >
                        <div className="space-y-1">
                            {/* Render messages */}
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.sender === "user"
                                            ? "justify-start"
                                            : "justify-end"
                                    }`}
                                >
                                    {/* Message container with no background for image */}
                                    <div className="max-w-xs p-3  ">
                                        {/* Message text container with background */}
                                        {message?.message && (
                                            <div
                                                className={`flex ${
                                                    message.sender === "user"
                                                        ? "justify-start"
                                                        : "justify-end"
                                                }`}
                                            >
                                                <p
                                                    className={`${
                                                        message.sender ===
                                                        "user"
                                                            ? "bg-gray-300 text-black"
                                                            : "bg-customGray text-white"
                                                    } p-2 rounded-lg flex justify-end inline-block`}
                                                >
                                                    {message.message}
                                                </p>
                                            </div>
                                        )}

                                        {/* Image display */}
                                        {typeof message.image === "object" &&
                                        message.image instanceof Blob ? (
                                            <div className="mt-2">
                                                <a
                                                    href={URL.createObjectURL(
                                                        message.image
                                                    )}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            message.image
                                                        )}
                                                        alt="Uploaded"
                                                        className="w-full h-auto rounded-lg object-cover"
                                                    />
                                                </a>
                                            </div>
                                        ) : (
                                            message.image && (
                                                <div className="mt-2">
                                                    <a
                                                        href={
                                                            config.SERVER_URL +
                                                            message.image
                                                        }
                                                        download
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={
                                                                config.SERVER_URL +
                                                                message.image
                                                            }
                                                            alt="Uploaded"
                                                            className="w-full h-auto rounded-lg object-cover"
                                                        />
                                                    </a>
                                                </div>
                                            )
                                        )}
                                        {message?.date && (
                                            <div className="mt-1 text-xs text-gray-500">
                                                <span>
                                                    {format(
                                                        new Date(message.date),
                                                        "h:mm a"
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                    <footer className="bg-white p-4 border-t border-gray-200 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between space-x-4">
                            {/* Image Preview and Remove Button */}
                            {image && (
                                <div className="relative flex items-center justify-center">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="uploaded"
                                        className="w-12 h-12 rounded-full object-cover bg-gray-200 shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage} // Remove the selected image
                                        className="absolute top-0 right-0 bg-red-500 text-white h-5 w-5 rounded-full text-xs p-1"
                                    >
                                        X
                                    </button>
                                </div>
                            )}

                            {/* Input and Attachment */}
                            <div className="flex items-center space-x-4 flex-1">
                                {/* Attachment Button */}
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer text-gray-500 hover:text-gray-800 transition duration-200"
                                >
                                    <ImAttachment className="text-2xl" />
                                </label>

                                {/* Hidden File Input */}
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                {/* Message Input */}
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    placeholder="Type your message..."
                                    className="w-full p-3 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />

                                {isLoading ? (
                                    <BtnLoader />
                                ) : (
                                    <button
                                        onClick={handleSendMessage}
                                        className="ml-2 px-4 py-2 bg-customGray text-white rounded-lg hover:bg-gray-700 transition duration-200"
                                    >
                                        Send
                                    </button>
                                )}
                            </div>
                        </div>
                    </footer>
                </>
            )}
            {/* Chat Window */}
        </div>
    );
};

export default SupportChatPage;
