import { realm } from "../realm";

export const saveMPIN = (mpin) => {

  realm.write(() => {

    realm.create("User", {
      _id: "user1",
      mpin: mpin,
      createdAt: new Date()
    }, "modified");

  });

};

export const getMPIN = () => {

  const user = realm.objectForPrimaryKey("User","user1");
  return user?.mpin;

};

export const updateMPIN = (mpin) => {

  realm.write(() => {

    realm.create(
      "User",
      {
        _id: "user1",
        mpin: mpin,
        createdAt: new Date()
      },
      "modified"
    );

  });

};