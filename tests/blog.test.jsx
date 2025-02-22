import { render, screen } from "@testing-library/react"
import Blog from "../src/components/Blog.jsx"
import PostBlog from "../src/components/PostBlog.jsx"
import { test, expect , vi } from 'vitest'
import userEvent from "@testing-library/user-event";




test('render blog', async () => {
  const testBlog = {
    title: 'testing today',
    author: 'benny shaw',
    url: 'testingtodayblog.com',
    likes: 22,
  }

  render(<Blog blog={testBlog}></Blog>)
  const element = screen.getByText(`title: ${testBlog.title} author: ${testBlog.author}`)
  expect(element).toBeDefined()
})


test('details shown when show more button clicked', async () => {
  const testBlog = {
    title: 'testing today',
    author: 'benny shaw',
    url: 'testingtodayblog.com',
    likes: 22,
  }
  const user = userEvent.setup()


  render(<Blog blog={testBlog}></Blog>)
  const button = screen.getByRole('button')
  await user.click(button)
  const urlElement = screen.getByText(`url: ${testBlog.url}`);
  const likesElement = screen.getByText(`likes: ${testBlog.likes}`);
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
})

test('double click like increases like twice', async () => {
  const testBlog = {
    title: 'testing today',
    author: 'benny shaw',
    url: 'testingtodayblog.com',
    likes: 22,
  }
  const mockIncrement = vi.fn().mockImplementation(() => {
    testBlog.likes++;
  });
  const user = userEvent.setup();
  const { rerender } = render(<Blog handleIncrementLikes={ mockIncrement } blog={testBlog}></Blog>);
  const button = screen.getByRole('button');
  await user.click(button);
  rerender(<Blog blog={testBlog} handleIncrementLikes={mockIncrement} />)
  const likeButton = screen.getByText("increase likes");
  await user.dblClick(likeButton);
  rerender(<Blog blog={testBlog} handleIncrementLikes={mockIncrement} />)
  const likesElement = screen.getByText(`likes: ${22 + 2}`);
  expect(mockIncrement).toHaveBeenCalledTimes(2)
  expect(testBlog.likes).toBe(24);
  expect(likesElement).toBeDefined();
})

test("form works", async () => {
  const mockHandleBlog = vi.fn();
  render(<PostBlog handleBlog={ mockHandleBlog } ></PostBlog>);
  const user = userEvent.setup();
  const numberEntry = screen.getByRole('spinbutton')
  const textEntries = screen.getAllByRole('textbox');
  await user.type(textEntries[0], 'my title');
  await user.type(textEntries[1], 'ben xiao');
  await user.type(textEntries[2], 'myblog.com');
  await user.type(numberEntry, '5');
  await user.click(screen.getByRole('button'));
  expect(mockHandleBlog.mock.calls).toHaveLength(1);
  expect(mockHandleBlog.mock.calls[0][0]).toEqual({
    title: 'my title',
    author: 'ben xiao',
    url: 'myblog.com',
    likes: 5
  })
})