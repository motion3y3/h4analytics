import { Column } from "@ant-design/plots";
import { Card } from "antd";
import { DocumentData } from "firebase/firestore";

function BarChart({ attendanceData }: { attendanceData: DocumentData[] }) {
    // Sample data for the bar chart
    let data = [
        { meeting: 'psrp', present: 0 },
        { meeting: 'lifestudy', present: 0 },
        { meeting: 'cellgroup', present: 0 },
        { meeting: 'lordsday', present: 0 },
        { meeting: 'prophesying', present: 0 },
        { meeting: 'sheperding', present: 0 },
    ];

    attendanceData.map(attendance => {
        const date = new Date(attendance.date)
        if (date.getMonth() === 9) {
            if (attendance.psrp) {
                data = updatePresentForMeeting('psrp', data);
            }

            if (attendance.lifestudy) {
                data = updatePresentForMeeting('lifestudy', data);
            }

            if (attendance.cellgroup) {
                data = updatePresentForMeeting('cellgroup', data);
            }

            if (attendance.lordsday) {
                data = updatePresentForMeeting('lordsday', data);
            }

            if (attendance.prophesying) {
                data = updatePresentForMeeting('prophesying', data);
            }

            if (attendance.sheperding) {
                data = updatePresentForMeeting('sheperding', data);
            }
        }
    },
    )

    // Ant Design chart configuration
    const config = {
        data,
        xField: 'meeting',
        yField: 'present',
        title: {
            text: 'KL Hall 4 Attendance',
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };

    return (
        <Card title="KL Hall 4 Attendance">
            <Column {...config} />
        </Card>
    );
}

function updatePresentForMeeting(meetingName: string, data: any[]) {
    const updatedData = data.map((item) => {
        if (item.meeting === meetingName) {
            // Update 'present' by adding 1
            return { ...item, present: item.present + 1 };
        }
        return item;
    })
    return updatedData;
}

export default BarChart;