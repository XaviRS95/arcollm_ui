import { useEffect, useRef, useState } from "react";
import { getStreamingChatCall } from "../api/getStreamingChatCall.jsx";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function useGeneratorHook(message, model, options, conversation, user_mail, conversation_id) {
    const [generatedMessages, setGeneratedMessages] = useState([]);
    const [messageQueue, setMessageQueue] = useState([]);
    const lastMachineMessageIndexRef = useRef(null);
    const messageHistory = useRef([]);

    useEffect(() => {
        if (message && message.length > 0) {
            setMessageQueue(prev => [...prev, message]);
        }
    }, [message]);

    function generateInputMessage(nextMessage, userIndex) {
        return (
            <div className="text-div" key={`user-${userIndex}`}>
                <div className="user-message">
                    <ReactMarkdown
                        children={nextMessage}
                        components={{
                            code({ inline, className, children, ...props }) {
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
                                    <code className={className} {...props}>{children}</code>
                                );
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

    function generateResponseMessage(nextMessage, machineIndex){

        return (
            <div className="text-div" key={`machine-${machineIndex}`}>
                <div className="answer-message">
                    <ReactMarkdown
                        children={nextMessage}
                        components={{
                            code({ inline, className, children, ...props }) {
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
                                    <code className={className} {...props}>{children}</code>
                                );
                            }
                        }}
                    />
                </div>
            </div>
        );
    }


    useEffect(() => {
        if (messageQueue.length === 0) return;

        const nextMessage = messageQueue[0];
        const userIndex = generatedMessages.length;

        const userMessage = generateInputMessage(nextMessage, userIndex)

        setGeneratedMessages(prev => [...prev, userMessage]);

        const machineIndex = userIndex + 1;
        const placeholder = (
            <div className="text-div" key={`machine-${machineIndex}`}>
                <div className="answer-message"><p>...</p></div>
            </div>
        );
        setGeneratedMessages(prev => [...prev, placeholder]);
        lastMachineMessageIndexRef.current = machineIndex;

        getStreamingChatCall(
            nextMessage,
            model,
            options,
            messageHistory.current,
            user_mail,
            conversation_id,
            (streamedText) => {
                setGeneratedMessages(prev => {
                    const updated = [...prev];
                    updated[machineIndex] = (
                        <div className="text-div" key={`machine-${machineIndex}`}>
                            <div className="answer-message">
                                <ReactMarkdown
                                    children={streamedText}
                                    components={{
                                        code({ inline, className, children, ...props }) {
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
                                                <code className={className} {...props}>{children}</code>
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
        );

        setMessageQueue(prev => prev.slice(1));
    }, [messageQueue, generatedMessages]);

    return generatedMessages;
}
