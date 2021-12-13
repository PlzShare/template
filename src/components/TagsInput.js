import React, {useRef} from "react";
import "../assets/scss/components/tag.scss"
import axios from 'axios';

const TagsInput = ({selectedTags}) => {
    const firstPlaceholder = "초대할 멤버의 아이디를 입력해주세요";
    const warningPlaceholder = "없는 아이디입니다. 다시 입력해주세요";

    const placeholderChange = useRef();
    const [tags, setTags] = React.useState([]);
    const [tagNums, setTagNums] = React.useState([]);
    const removeTags = indexToRemove => {
      setTags([...tags.filter((_, index) => index !== indexToRemove)]);
      setTagNums([...tagNums.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = async(event) => {
      event.preventDefault(); // 용수야 이거맞음...?

      const checkId = event.target.value
      event.target.value = "";
      if (checkId !== "") {
        const response = await axios.post('/users/checkUser', {
          id: checkId
        })

        if(response.data.data === null){
          placeholderChange.current.placeholder = warningPlaceholder
          // placeholderChange.current.style="color: #ff0000;"; // 텍스트 창 바꾸기
          return
        }

        setTags([...tags, checkId]);
        setTagNums([...tagNums, response.data.data]);

        selectedTags([...tagNums, response.data.data]);
        placeholderChange.current.placeholder = firstPlaceholder;
        placeholderChange.current.style="";
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
          ref={placeholderChange}
          onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
          placeholder={firstPlaceholder}
        />
      </div>
    );
  };
export default TagsInput;