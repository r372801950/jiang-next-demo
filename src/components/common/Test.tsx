import { useImmer } from "@hooks/useImmer";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { todoCountAtom, userAtom } from "@/states";

interface UserInfo {
  name: string;
  age: number;
  skills: string[];
}

const ObjectStateTest = () => {
  console.log("🍊进Test第一步我被渲染了");
  const [count, setCount] = useAtom(todoCountAtom);
  const [user, updateUser] = useAtom(userAtom);
  // const [count, setCount] = useAtom(todoCountAtom);
  useEffect(() => {
    console.log("🍊我被渲染了");
  }, []);
  const [info, setInfo] = useState<UserInfo>({
    name: "John",
    age: 25,
    skills: ["React", "TypeScript"],
  });
  // const [info, setInfo] = useState(22);
  const [userInfo, setUserInfo] = useImmer<UserInfo>({
    name: "John",
    age: 25,
    skills: ["React", "TypeScript"],
  });
  // 错误的更新方式 - 直接修改同一个对象
  const handleUseStateUpdate = () => {
    // setInfo(22);
    setInfo({
      name: "John",
      age: 25,
      skills: ["React", "TypeScript"],
    });
  };

  const handleWrongUpdate = () => {
    setUserInfo({ name: "John", age: 25, skills: ["React", "TypeScript"] });
  };

  const handleJotaiUpdate = () => {
    updateUser((draft) => {
      draft.name = "John";
      draft.age = 25;
      draft.skills[0] = "React";
      // draft.skills.push('React')
      //数组和对象等引用 无法判断
      // 只会做引用比较（===），而不会做深度内容比较
      // draft.skills = ['React', 'TypeScript']
      // draft.skills = [...draft.skills];

      // 这个是直接赋值对象引用，一样检测不到内容相同，只会判断引用地址===
      // draft.address = {
      //   city: '上海',
      //   street: '南京路'
      // }
    });
    /*updateUser({
      name: 'John',
      age: 25,
      skills: ['React', 'TypeScript'],
      address: {
        city: '上海',
        street: '南京路'
      },
      projects: [
        { id: 1, name: '项目A', completed: false },
        { id: 2, name: '项目B', completed: true }
      ]
    });*/
  };

  // 正确的更新方式 - 创建新对象
  const handleCorrectUpdate = () => {
    setUserInfo((userInfo) => {
      userInfo.name = "ZHIJIA";
      userInfo.age = 25;
      userInfo.skills = ["React", "TypeScript"];
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{JSON.stringify(info)}</h2>
        <h2 className="text-xl font-bold">jotai：{JSON.stringify(user)}</h2>
        <h2 className="text-xl font-bold">用户信息</h2>
        <p>姓名: {userInfo.name}</p>
        <p>年龄: {userInfo.age}</p>
        <p>技能: {userInfo.skills.join(", ")}</p>
      </div>

      <div className="space-x-4">
        <button
          onClick={handleUseStateUpdate}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-300 cursor-pointer"
        >
          useState 相同值更新（重新渲染）
        </button>
        <button
          onClick={handleWrongUpdate}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-300 cursor-pointer"
        >
          自定义UserImmer 相同值更新（不会重新渲染）
        </button>
        <button
          onClick={handleJotaiUpdate}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-300 cursor-pointer"
        >
          jotai autoWithImmer 相同值更新（不会重新渲染）
        </button>

        <button
          onClick={handleCorrectUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          正确更新
        </button>
      </div>
    </div>
  );
};
ObjectStateTest.whyDidYouRender = true;
export default ObjectStateTest;
