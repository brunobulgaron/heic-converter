import { Github } from "lucide-react";

export function ConverterFooter() {
  return (
    <footer className="max-w-md flex flex-col justify-center items-center text-center text-zinc-700 mt-10">
      <span>
        This is but a simple App developed on top of the{" "}
        <a
          href="https://github.com/alexcorvi/heic2any"
          target="_blank"
          className="hover:text-zinc-500"
        >
          heic2any
        </a>{" "}
        library.
      </span>
      <a
        href="https://github.com/brunobulgaron"
        className="flex gap-2 mt-4 hover:text-zinc-500"
        target="_blank"
      >
        <Github strokeWidth={1.5} /> GitHub
      </a>
    </footer>
  );
}
