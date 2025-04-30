import './ChatComponentStyles.css';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState, useRef } from "react";

export default function ChatComponentMain({ message }) {
    const [generatedMessages, setGeneratedMessages] = useState([]);
    const [messageQueue, setMessageQueue] = useState([]);
    const lastMachineMessageIndexRef = useRef(null);
    var messageHistory = useRef([]) //History of this whole conversation as a list of JSONs

    // Watch for new props and queue them
    useEffect(() => {
        if (message && message.prompt && message.prompt.length > 0) {
            setMessageQueue(prev => [...prev, message]);
        }
    }, [message]);

    useEffect(() => {
        if (messageQueue.length === 0) return;

        const nextMessage = messageQueue[0];

        // Add user message
        const userIndex = generatedMessages.length;
        const userMessage = (
            <div className="text-div" key={`user-${userIndex}`}>
                <div className="user-message">
                    <ReactMarkdown
                        children={nextMessage.prompt}
                        components={{
                            code({inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    />
                </div>
            </div>
        );

        setGeneratedMessages(prev => [...prev, userMessage]);

        // Generate machine response using both prompt and model
        generateMachineResponse(nextMessage.prompt, nextMessage.model, userIndex + 1);

        // Remove processed message from the queue
        setMessageQueue(prev => prev.slice(1));
    }, [messageQueue, generatedMessages]);

    async function generateMachineResponse(prompt, model, machineIndex) {
        let streamedText = "";

        const placeholder = (
            <div className="text-div" key={`machine-${machineIndex}`}>
                <div className="answer-message">
                    <p>...</p>
                </div>
            </div>
        );

        setGeneratedMessages(prev => [...prev, placeholder]);
        lastMachineMessageIndexRef.current = machineIndex;

        try {
            messageHistory.current.push({
                role: 'user',
                content: prompt
            });

            const response = await fetch("http://localhost:8000/api/chat_request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: messageHistory.current,
                    options: {},
                    model: model

                })
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            //Receives the model response in streaming:
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                streamedText += decoder.decode(value);

                setGeneratedMessages(prev => {
                    const updated = [...prev];
                    updated[machineIndex] = (
                        <div className="text-div" key={`machine-${machineIndex}`}>
                            <div className="answer-message">
                                <ReactMarkdown
                                    children={streamedText}
                                    components={{
                                        code({inline, className, children, ...props}) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    style={oneDark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    );
                    return updated;
                });
            }

            messageHistory.current.push(
                {
                    'role': 'assistant',
                    'content': streamedText
                }
            )

            console.log(messageHistory.current);

        } catch (error) {
            console.error("Streaming error:", error);
        }
    }

    return (
        <div id="ChatComponentMain">
            {generatedMessages}
        </div>
    );
}
