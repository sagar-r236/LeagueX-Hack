import { ShimmerContentBlock } from "react-shimmer-effects";

const ListShimmer = () => {
  const a = [1, 2, 3, 4];
  return a.map(() => (
    <ShimmerContentBlock
      card
      title
      text
      thumbnailWidth={300}
      thumbnailHeight={300}
    />
  ));
};

export default ListShimmer;
