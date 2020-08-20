import { User } from "./user.model";

export const me = (req, res) => {
  try {
    res.status(200).json({ data: req.user });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).send(error);
  }
};