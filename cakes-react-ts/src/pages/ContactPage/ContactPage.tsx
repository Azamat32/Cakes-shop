import { useState, useRef, useEffect } from "react";
import "./ContactPage.scss";
type Props = {};

const ContactPage = (_props: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);
  return (
    <div className="contactPage">
      <div className="container">
        <div className="contact_wrap">
          <div className="contact_left">
            <h1>Контакты</h1>
            <div className="left_group">
              <span>Телефон</span>
              <span>+7 (771) 555 60 60</span>
            </div>
            <div className="left_group">
              <span>E-mail:</span>
              <span>feedback@taptatti.kz</span>
            </div>
          </div>
          <div className="contact_right">
            <div className="right_text">
              <p>
                Вы можете оставить свои данные по всем имеющимся вопросам,
                замечаниям и предложениям. Мы рассмотрим его и свяжемся с вами
                как можно скорее
              </p>
              <div className="right_group">
                <label>Как Вас зовут?</label>
                <input type="text" placeholder="Имя" />
              </div>
              <div className="right_group">
                <label>E-mail</label>
                <input type="text" placeholder="Email" />
              </div>
              <div className="right_group">
                <label>Телефон</label>
                <input type="text" placeholder="+7 (___) ___ __ __" />
              </div>
              <div className="right_group">
                <label>Сообщение</label>
                <textarea
                  ref={textareaRef}
                  style={styles.textareaDefaultStyle}
                  onChange={textAreaChange}
                >
                  {value}
                </textarea>
              </div>
              <div className="right_btn">
                <button>Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

const styles: { [name: string]: React.CSSProperties } = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textareaDefaultStyle: {
    padding: 12,
    width: 100 + "%",
    display: "block",
    resize: "none",
    border: " 1px solid #989898",
    outline:"none",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
};
