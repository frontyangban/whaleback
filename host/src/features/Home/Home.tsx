const Home = () => {
  return (
    <div className="flex items-center justify-center h-[66vh] text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          고래등 같은 기와집 (에 살고 싶은)
        </h1>
        <p className="text-lg mb-4">
          {new Date().getFullYear() - new Date('2021-03-01').getFullYear()}년차
          개발자입니다. <br />
          아내🤦🏻‍♀️와 두 고양이🐈🐈‍⬛와 함께 살고 있어요. <br />
        </p>
      </div>
    </div>
  )
}

export default Home
