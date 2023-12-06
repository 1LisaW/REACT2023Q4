export default function AvatarInput() {
  return (
    <div className="margin: 16px; padding: 16px">
      <input
        className="form-control form-control-lg"
        id="avatar"
        type="file"
        accept="image/png, image/jpeg"
      />
    </div>
  );
}
