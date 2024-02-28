import { Card, Input, Space, Tag, Typography } from "antd";
import { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import ReactLogo from "../../Assests/React-icon.svg.png";
import BannerImage from "../../Assests/react-logo.svg";
import Navbar from "../../Components/NavBar";

const { CheckableTag } = Tag;
const { Search } = Input;
const courses = [
  {
    id: 1,
    name: "Course 1",
    description: "Description for Course 1",
    price: "$19.99",
    imageUrl: ReactLogo,
  },
  {
    id: 2,
    name: "Course 2",
    description: "Description for Course 2",
    price: "$29.99",
    imageUrl: BannerImage,
  },
  // Add more courses as needed
];

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const tagsData = ["#Movies", "#Books", "#Music", "#Sports"];
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);
const Dashboard: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Books"]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <>
    <Navbar></Navbar>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <span style={{ marginRight: 8, fontSize: 18 }}>Categories:</span> */}
        <Space size={[0, 8]} wrap>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked: boolean) => handleChange(tag, checked)}
              style={{ fontSize: 18, fontStyle: "oblique" }}
            >
              {tag}
            </CheckableTag>
          ))}
        </Space>
        <div style={{ marginRight: "5px" }}>
          <Space direction="vertical">
            <Search
              placeholder="Search courses"
              onSearch={onSearch}
              enterButton
              style={{ width: 500 }}
            />
          </Space>
        </div>
      </div>
      <div style={{padding:"10px"}}>
      <Typography.Title level={4} style={{ marginTop: "1px" }}>
        Discover Courses
      </Typography.Title>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f0f2f5",
          borderRadius: "16px",
        }}
      >
        <Space size={16} wrap>
          {courses.map((course) => (
            <Card
              key={course.id}
              style={{ width: 300 }}
              cover={
                <img
                  style={{ height: 200, objectFit: "cover" }}
                  alt={course.name}
                  src={course.imageUrl}
                />
              }
            >
              <Card.Meta
                title={course.name}
                description={
                  <Space direction="vertical">
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {course.description}
                    </Paragraph>
                    <Title level={5}>{course.price}</Title>
                  </Space>
                }
              />
            </Card>
          ))}
        </Space>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
