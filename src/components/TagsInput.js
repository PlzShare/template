import React from "react";
import "../assets/scss/components/tag.scss"
const TagsInput = ({selectedTags}) => {
    const [tags, setTags] = React.useState([]);
    const removeTags = indexToRemove => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
      if (event.target.value !== "") {
        setTags([...tags, event.target.value]);
        selectedTags([...tags, event.target.value]);
        event.target.value = "";
      }
    };
    return (
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon'
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
          placeholder="초대할 멤버의 아이디를 입력해주세요"
        />
      </div>
    );
  };
export default TagsInput;