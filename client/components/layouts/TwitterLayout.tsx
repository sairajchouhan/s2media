import React from 'react'
import LeftNav from '../LeftNav'
import RightNav from '../RightNav'

const TwitterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="relative z-0 flex flex-shrink-0 p-0 m-0 pointer-events-auto">
    //   <header className="relative z-10 flex flex-col items-end flex-grow flex-shrink-0">
    //     <div className="relative flex flex-col items-end flex-grow flex-shrink-0 bg-red-100 w-60">
    //       <div className="fixed top-0 z-0 flex flex-col items-stretch flex-shrink-0 h-full">
    //         <LeftNav />
    //       </div>
    //     </div>
    //   </header>
    //   <main className="relative z-0 flex flex-col items-start flex-grow flex-shrink min-h-screen p-0 m-0">
    //     <div className="relative z-0 flex flex-col items-stretch flex-grow flex-shrink w-full max-w-6xl p-0 m-0">
    //       <div className="relative z-0 flex flex-col items-stretch flex-grow flex-shrink-0 p-0 m-0">
    //         <div className="relative flex justify-between flex-grow flex-shrink-0 min-h-full ">
    //           {/* middle */}
    //           <div className="relative z-0 flex flex-col items-stretch flex-shrink-0 w-3/5 ml-0 mr-0 border border-l border-r border-gray-300">
    //             <div className="relative z-0 flex flex-col items-stretch p-0 m-0">{children}</div>
    //           </div>
    //           {/* right */}
    //           <div className="relative flex flex-col items-stretch flex-shrink-0 w-2/5">
    //             <div className="relative z-0 flex flex-col items-stretch h-full max-w-lg p-0 m-0">
    //               <div className="sticky flex flex-col items-stretch flex-shrink-0 p-0 m-0 ">
    //                 <RightNav />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
    <div className="w-full ">
      <div className="flex w-11/12 mx-auto">
        <header className="relative z-10 flex flex-col items-end flex-shrink">
          <div className="relative flex flex-col items-end flex-shrink-0 w-72">
            <div className="fixed top-0 z-0 flex flex-col items-stretch flex-shrink-0 h-full">
              <LeftNav />
            </div>
          </div>
        </header>
        <div className="grid w-full grid-cols-12 gap-6">
          <div className="col-span-8 ml-6 bg-indigo-100">{children}</div>
          <div className="col-span-4 ">
            <RightNav />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwitterLayout
