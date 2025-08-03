import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_authenticated/dashboard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col py-8  bg-card rounded-lg p-8">
      <div className="flex items-center justify-between mb-10">
        <div className="relative flex flex-col items-center w-full">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-5xl text-gray-400 mx-auto relative">
            <span className="material-icons">person</span>
            <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow border border-gray-200 cursor-pointer">
              <span className="material-icons text-base text-gray-500">edit</span>
            </span>
          </div>
        </div>
        <a
          href="#"
          className="text-primary text-sm font-medium flex items-center gap-1 hover:underline whitespace-nowrap ml-auto"
        >
          Edit profile information <span className="material-icons text-base">arrow_forward</span>
        </a>
      </div>
      <div className="mb-10">
        <h2 className="font-semibold text-lg mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="text-muted-foreground">Full names</div>
          <div className="text-right text-gray-700 font-medium">Uwase Kenia</div>
          <div className="text-muted-foreground">Trade</div>
          <div className="text-right text-gray-700 font-medium">Welding</div>
          <div className="text-muted-foreground">Level</div>
          <div className="text-right text-gray-700 font-medium">Level 3</div>
          <div className="text-muted-foreground">DOB</div>
          <div className="text-right text-gray-700 font-medium">12 May 2004</div>
          <div className="text-muted-foreground">Student code</div>
          <div className="text-right text-gray-700 font-medium">110110957</div>
        </div>
      </div>
      <hr className="my-8 border-gray-200" />
      <div>
        <h2 className="font-semibold text-lg mb-4">Current Training Information</h2>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="text-muted-foreground">Industrial Name</div>
          <div className="text-right text-gray-700 font-medium">Sina Gerard Nyirangarama</div>
          <div className="text-muted-foreground">Province & District</div>
          <div className="text-right text-gray-700 font-medium">Northern in Rulindo District</div>
          <div className="text-muted-foreground">Training timeline</div>
          <div className="text-right text-gray-700 font-medium">12 May 2024 - 23 July 2024</div>
        </div>
      </div>
    </div>
  );
}
