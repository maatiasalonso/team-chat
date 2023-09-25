interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to " : ""}
        {name}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === "channel"
          ? `This is the start of #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};
