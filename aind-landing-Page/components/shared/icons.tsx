import { cx } from "cva";

const icons = {
  searchWhite: "/icons/search-white.svg",
  searchBlack: "/icons/search-black.svg",
  catalogWhite: "/icons/catalog-white.svg",
  catalogBlack: "/icons/catalog-black.svg",
  closeBlack: "/icons/close-black.svg",
  downloadBlack: "/icons/download-black.svg",
  infoBlack: "/icons/info-black.svg",
  gridBlack: "/icons/grid-black.svg",
  gridWhite: "/icons/grid-white.svg",
  listBlack: "/icons/list-black.svg",
  listWhite: "/icons/list-white.svg",
  rightArrowBlack: "/icons/right-arrow.svg",
  rightArrowWhite: "/icons/right-arrow-white.svg",
  plusBlack: "/icons/plus-black.svg",
  arrowWhite: "/icons/arrow-white.svg",
  linkWhite: "/icons/link-white.svg",
  arrowBlack: "/icons/arrow-black.svg",
  chevronBWhite: "/icons/chevron-b-white.svg",
  closeWhite: "/icons/close-white.svg",

  spotify: "/social/spotify.svg",
  instagram: "/social/instagram.svg",
  x: "/social/x.svg",
  youtube: "/social/youtube.svg",
  linkedIn: "/social/linkedIn.svg",
  applePodcast: "/social/apple-podcast.svg",
  discord: "/social/discord.svg",
  github: "/social/github.svg",
  threads: "/social/threads.svg",
};

export type IconName = keyof typeof icons;

type Props = Omit<React.ComponentProps<"img">, "sizes" | "src" | "srcSet"> & {
  name: IconName;
};

export function Icon({ name, alt, className, ...rest }: Props) {
  return (
    <img
      className={cx(className, "size-4")}
      src={icons[name]}
      alt={alt || name}
      {...rest}
    />
  );
}
