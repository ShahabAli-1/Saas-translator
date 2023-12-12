// here we use server actions
// server actions allow us to eradicate the step
// or need to create a post req endpoint
// "use client";
import generatePortalLink from "@/actions/generatePortalLink";
const ManageAccountButton = () => {
  const hitstripe = () => {
    alert("Management Account Functioanlity Currently in Work.");
  };
  return (
    <form action={hitstripe}>
      <button type="submit">Manage Billing</button>
    </form>
  );
};

export default ManageAccountButton;
