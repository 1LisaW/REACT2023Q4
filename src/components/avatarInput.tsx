// import { setAvatar } from "../store/slices/avatarSlice";
// import { useAppDispatch } from "../store/store";

// const convertBase64 = (file: File) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);

//         fileReader.onload = () => {
//             resolve(fileReader.result);
//         };

//         fileReader.onerror = (error) => {
//             reject(error);
//         };
//     });
// };



export default function AvatarInput(){
	// const dispatch = useAppDispatch();
	// const  uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (!event.target.files)
	// 		return ;
	// 	const file = event.target.files[0];
	// 	if (file.size > 10000000)
	// 		console.error('File should be less then 10Mb');
	// 	const base64 = await convertBase64(file) as string;
	// 	dispatch(setAvatar(base64));
	// 	console.log(base64);
	// 	// avatar.src = base64;
	// 	// textArea.innerText = base64;
	// };
	return(
		<div className="margin: 16px; padding: 16px">
		<input
			className="form-control form-control-lg"
			id="avatar"
			type="file"
			accept="image/png, image/jpeg"
			// onChange={(e)=> uploadImage(e)}
		/>
		</div>
	)
}
