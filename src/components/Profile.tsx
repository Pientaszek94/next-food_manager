import { useRef, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { userInfoInterface } from "../../utils/interfaces";
import { useUpdateUserMutation } from "@/redux/services/authService";
import { updateUserInfo } from "@/redux/features/authSlice";
import { CropImage, UserDialog } from ".";
import styles from "../styles/profile.module.scss";
import inputStyles from "../styles/profile_inputs.module.scss";
import noprofile from "../../public/no-profile.svg";
import { placeholder } from "@/placeholder";
import Favourites from "./Favourites";
import ModalRecipe from "./ModalRecipe";

function Profile(props: { userInfo: userInfoInterface; postsList: any[] }) {
  const { userInfo } = props;
  console.log("Profile List", props.postsList);
  // const [deleteUser]=useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation();
  const [error, setError] = useState<any>();
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>();
  const [description, setDescription] = useState<string>(
    userInfo?.desc ? userInfo?.desc : "",
  );

  // const handleDeleteUser=async()=>{
  //     await deleteUser().unwrap()
  //     .then(()=>{ dispatch(logout()) })
  // }

  const handleChange = async (data: any) => {
    await updateUser(data)
      .unwrap()
      .then(() => dispatch(updateUserInfo(data)));
  };

  // DIALOG ONLY
  const openModal = () => {
    dialogRef.current!.showModal();
  };

  return (
    <div className={styles.profile}>
      <UserDialog dialogRef={dialogRef}>
        <CropImage
          handleChange={handleChange}
          setError={setError}
          error={error}
          dialogRef={dialogRef}
        />
      </UserDialog>
      <ModalRecipe {...props} />
      <main>
        <div className={styles.user_hero}>
          <div
            className={styles.user_img}
            style={{
              backgroundImage: `url(${!userInfo?.image ? noprofile : userInfo?.image})`,
            }}
          >
            <div className="small-btn orange" onClick={() => openModal()}>
              <span className="material-symbols-outlined">add</span>
            </div>
          </div>
        </div>
        <div className={styles.grid_container}>
          <div className={styles.user_info}>
            <h4>{userInfo?.name!.toUpperCase()}</h4>
            <h6 style={{ opacity: "0.5" }}>{userInfo?.email}</h6>
            <textarea
              name="description"
              defaultValue={description ? description : ""}
              placeholder={placeholder}
              cols={46}
              rows={10}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => handleChange({ desc: description })}
              className={inputStyles.textarea}
            />

            <h6 style={{ textAlign: "right", opacity: "0.3" }}>
              {description.length}/500
            </h6>
          </div>
          <Favourites {...props} />
        </div>
      </main>
    </div>
  );
}

export default Profile;
