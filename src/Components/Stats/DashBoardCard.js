import { Card, Space, Statistic } from "antd";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card style={{ width: "20%", marginLeft: "40px" }}>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={title}
          value={value}
          icon={icon}
          loading={!value ? true : false}
        />
      </Space>
    </Card>
  );
};

export default DashboardCard;
