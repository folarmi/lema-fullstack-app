// PostCard.test.tsx
// import { render, screen, fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { PostCard } from "../components/cards/PostCard";

describe("PostCard", () => {
  const mockOnDelete = jest.fn();
  const title = "Sample Title";
  const post = "This is a sample post body.";

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("renders title and post content correctly", () => {
    render(<PostCard title={title} post={post} onDelete={mockOnDelete} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(post)).toBeInTheDocument();
  });

  it("calls onDelete when delete icon is clicked", () => {
    render(<PostCard title={title} post={post} onDelete={mockOnDelete} />);

    const deleteIcon = screen.getByTestId("delete-icon");
    fireEvent.click(deleteIcon);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});

//   "jest": {
//     "setupFilesAfterEnv": [
//       "<rootDir>/setupTests.ts"
//     ],
//     "testEnvironment": "jest-environment-jsdom",
//     "moduleFileExtensions": [
//       "ts",
//       "tsx",
//       "js",
//       "jsx",
//       "json",
//       "node"
//     ],
//     "testMatch": [
//       "**/?(*.)+(test).[tj]s?(x)"
//     ]
//   },
