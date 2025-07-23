import { Delete } from "lucide-react";
import { CardProp } from "../../utils/types";
import { CustomText } from "../CustomText";

const PostCard = ({ post, title, onDelete }: CardProp) => {
  return (
    <div className="py-3 px-4 sm:py-4 sm:px-6 border border-gray_300 rounded-lg sm:mr-6 mb-4 sm:mb-6 shadow-box-shadow w-full sm:w-auto">
      <div className="flex justify-end">
        <Delete
          onClick={onDelete}
          className="w-4 h-4 sm:w-5 sm:h-5"
          data-testid="delete-icon"
        />
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
