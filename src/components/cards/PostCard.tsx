import bin from "../../assets/bin.svg";
import { CardProp } from "../../utils/types";
import { CustomText } from "../CustomText";

const PostCard = ({ post, title, onDelete }: CardProp) => {
  return (
    // <div className="py-4 px-6 border border-gray_300 rounded-lg mr-6 mb-6 shadow-box-shadow">
    //   <div className="flex justify-end">
    //     <img src={bin} onClick={onDelete} />
    //   </div>

    //   <CustomText variant="textLarge">{title}</CustomText>
    //   <CustomText variant="textSm" className="leading-5">
    //     {post}
    //   </CustomText>
    // </div>

    <div className="py-3 px-4 sm:py-4 sm:px-6 border border-gray_300 rounded-lg sm:mr-6 mb-4 sm:mb-6 shadow-box-shadow w-full sm:w-auto">
      <div className="flex justify-end">
        <img src={bin} onClick={onDelete} className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      <CustomText variant="textLarge" className="text-base sm:text-lg">
        {title}
      </CustomText>
      <CustomText variant="textSm" className="leading-5 text-xs sm:text-sm">
        {post}
      </CustomText>
    </div>
  );
};

export { PostCard };
