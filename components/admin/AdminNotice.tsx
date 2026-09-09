type AdminNoticeProps = {
  tone: "error" | "empty";
  title: string;
  body: string;
};

/** Aviso de error o de estado vacío en el panel. */
export function AdminNotice({ tone, title, body }: AdminNoticeProps) {
  return (
    <div
      className={`admin-notice admin-notice--${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
