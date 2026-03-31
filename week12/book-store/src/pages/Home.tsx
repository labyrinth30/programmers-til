import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";

const Home = () => {
    return (
        <>
            <Title size="large">Home</Title>
            <Button size="large" schema="primary">Button</Button>
            <InputText placeholder="여기에 입력하세요" />
            <div>home body</div>
        </>
    )
}

export default Home