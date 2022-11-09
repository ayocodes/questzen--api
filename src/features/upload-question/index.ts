import { Request, Response } from "express";
import { Web3Storage, File } from "web3.storage";

export default async (req: Request, res: Response) => {
  const token = process.env.TOKEN;
  const storage = new Web3Storage({ token: token || "" });
  const data = req.body;

  try {
    const buffer = Buffer.from(JSON.stringify(data));

    const file = [new File([buffer], "quiz.json")];

    const cid = await storage.put(file, { wrapWithDirectory: false });
    console.log("Content added with CID:", cid);

    return res.json({ status: 200, success: true, cid: cid });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 400,
      success: false,
      err: error,
    });
  }
};
