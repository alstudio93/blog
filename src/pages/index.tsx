import type { NextPage } from "next";
import Container from "../components/commons/Container";
import Header from "../components/commons/Header";
import MetaHead from "../components/commons/MetaHead";
import Screen from "../components/commons/Screen";
import PostCardLoader from "../components/loaders/PostCardLoader";
import SearchInput from "../components/SearchInput";
import PostCard from "../components/sections/PostCard";
import LeftNav from "../components/sidebars/LeftNav";
import { trpc } from "../utils/trpc";
import { GetPostType } from "../server/router/posts";
import RightNav from "../components/sidebars/RightNav";
import PostButton from "../components/sections/PostButton";
import PostForm from "../components/sections/PostForm";
import useModal from "../utils/hooks/useModal";


const Home: NextPage = () => {
  const { open, setOpen } = useModal(); // form
  const { open: openMenu, setOpen: setOpenMenu } = useModal(); // menu
  const { data, isLoading } = trpc.useQuery(['posts.get-all-posts'])
  return (
    <>
      <MetaHead title="Blog" />
      <Screen>
        <Header />
        <Container className="md:grid md:grid-cols-4 md:gap-3 max-w-7xl">
          <div className="md:block hidden">
            <div className="sticky top-2">
              <LeftNav />
            </div>
          </div>

          <div className="md:col-span-2">
            <PostButton />
            <PostForm type="create" open={open} setOpen={setOpen} />
            <div className="mt-5" />
            <SearchInput placeholder="Search Posts" />

            {/* <Tabs/> */}
            {isLoading &&
              <PostCardLoader />
            }

            {
              data?.map((post) => (
                <PostCard key={post.id} {...(post as GetPostType)} />
              ))
            }

            {data?.length === 0 && (
              <h3 className="font-bold text-center my-5 ">No Post Found</h3>
            )}
          </div>
          <div className="md:block hidden">
            <div className="sticky top-2">
              <RightNav />
            </div>
          </div>
        </Container>
      </Screen>
    </>
  );
};

export default Home;
