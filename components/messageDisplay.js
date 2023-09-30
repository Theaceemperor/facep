


export default function RecievedMessageDisplay({ sender,recievedMessage,recievedTime }) {

    return (
        <blockquote className="border-l border-indigo-800/50 max-w-[80%] sm:max-w-[70%] rounded-md my-2 p-1 shadow-lg shadow-violet-800/50">
            <small>{sender}</small>
            <p className="text-indigo-700">{recievedMessage}</p>
            <small>{recievedTime}</small>
        </blockquote >
    )
}

export function SentMessageDisplay({ reciever,sentMessage,sentTime }) {

    return (
        <blockquote className="border-r border-indigo-800/50 max-w-[80%] sm:max-w-[70%] rounded-md my-2 p-1 shadow-lg shadow-violet-800/50 relative left-[20%] sm:left-[30%]">
            <small>{reciever}</small>
            <p className="text-indigo-700">{sentMessage}</p>
            <small>{sentTime}</small>
        </blockquote>
    )
}