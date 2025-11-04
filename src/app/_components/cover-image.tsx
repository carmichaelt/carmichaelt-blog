import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src?: string | null;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  // Validate that src is a valid non-empty string
  if (!src || typeof src !== "string" || src.trim() === "") {
    return null;
  }

  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full h-full object-cover rounded-lg", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={80}
      height={80}
      style={{ width: "100%", height: "100%" }}
    />
  );
  return (
    <div className="w-20 h-20">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
