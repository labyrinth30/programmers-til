export default function App() {
    let name = 'younha';
    let inlineStyle = {
        fontSize: '48px',
        color: 'white',
        backgroundColor: 'black'
    };

    return (
        <>
            {/* JSX 내부의 주석은 이렇게 작성해요. */}

            {/* JSX는 항상 하나의 부모 태그로 감싸서 반환해야 해요. */}
            <h1> JSX </h1>

            {/* HTML 내부에서 중괄호를 사용하면 자바스크립트 변수나 표현식을 사용할 수 있어요. */}
            <p> {name} </p>

            {/* 자바스크립트의 삼항 연산자를 활용한 조건부 렌더링이에요. */}
            {name === 'nulzi' ? <p> 환영합니다. </p> : <p> 누구세요? </p>}

            {/* HTML의 class 속성은 className 이라는 이름으로 사용해요. */}
            <div className='hidden'></div>

            {/* 인라인 스타일은 객체 변수로 넘겨주어야 하며, CSS 속성명은 카멜케이스(camelCase)로 작성해야 해요. */}
            <div style={inlineStyle}></div>

            {/* JSX 내부에서는 br 태그와 같이 내용이 없는 태그도 항상 닫는 태그가 필요해요. */}
            <br />
        </>
    );
}