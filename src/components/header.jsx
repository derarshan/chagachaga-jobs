import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedOut, SignedIn, SignIn, UserButton, useUser} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {

    const [showSignIn, setShowSignIn] = useState(false);

    const [search, setSearch] = useSearchParams();

    const { user } = useUser();

    useEffect(() => {
        if(search.get("signIn")){
            setShowSignIn(true);
        }
    }, [search])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    }

    return(
        <>
            <nav className="py-4 flex justify-between items-center">
                <Link>
                    <img src="/logo.png" alt="Logo Image" className="h-20" />
                </Link>

                <div className="flex gap-8">
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)}>Log-in</Button>
                    </SignedOut>

                    <SignedIn>
                        
                        {user?.unsafeMetadata?.role === "recruiter" && (
                            <Link to="/post-job">
                                <Button variant="destructive" className="rounded-full">Post A Job
                                    <PenBox size={20} className="mr-2"></PenBox>
                                </Button>
                            </Link>
                        )}

                        <UserButton appearance={{
                            elements: {
                                avatarBox: {
                                    width: "35px",
                                    height: "35px",
                                },
                            },
                        }}>
                            <UserButton.MenuItems>
                                <UserButton.Link 
                                label="My Jobs" 
                                labelIcon={<BriefcaseBusiness size={15}/>}
                                href="/my-jobs"/>

                                <UserButton.Link 
                                label="Saved Jobs" 
                                labelIcon={<Heart size={15}/>}
                                href="/saved-jobs"/>
                       
                            </UserButton.MenuItems>
                        </UserButton>

                    </SignedIn>
                    </div>
            </nav>

            {showSignIn && (<div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                                onClick={handleOverlayClick}>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <SignIn
                                        signUpForceRedirectUrl="/onboarding"
                                        fallbackRedirectUrl="/onboarding" />
                                </div>
                            </div>)}
        </>
    )
}

export default Header;