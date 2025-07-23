import { NewPostProp } from "../../utils/types";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "./CustomInput";

const NewPost = ({ toggleModal }: NewPostProp) => {
  return (
    <div className="p-6 bg-white w-full max-w-[679px] drop-shadow-custom rounded-lg">
      <p className="font-medium text-4xl text-gray_900 pb-6">New Post</p>

      <form className="flex flex-col gap-y-6">
        <CustomInput label="Post Title" placeholder="Give your post a title" />
        <CustomInput
          label="Post Content"
          textarea
          placeholder="Write something mind-blowing"
        />

        <div className="flex justify-end gap-4 bg-white">
          <CustomButton onClick={toggleModal} variant="secondary">
            Cancel
          </CustomButton>

          <CustomButton isLoading={false}>Publish</CustomButton>
        </div>
      </form>
    </div>
  );
};

export { NewPost };
