import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import { pool } from "../index.js"
import { uploader2 } from "./Cloudinary.js"


passport.use(
    new GoogleStrategy(
        {
            callbackURL: "/user/google/redirect",
            clientID: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // 1. Check if user already exists with this email and google id.
                const checkSql = `SELECT * FROM spotify.users WHERE email = $1 and googleid = $2`;
                const checkParams = [profile._json.email, profile.id];
                const existedUser = await pool.query(checkSql, checkParams);
                if (existedUser.rows.length == 1) return done(null, existedUser.rows[0]);

                // 2. Check if user already exists with this email but without this google id
                const checkSql2 = `SELECT * FROM spotify.users WHERE email = $1 and googleid is null`;
                const checkParams2 = [profile._json.email];
                const existedUser2 = await pool.query(checkSql2, checkParams2);
                if (existedUser2.rows.length == 1) return done(null, {emailAlreadyExists:true});


                // 3. Save user to DB and return new row
                const avatar = await uploader2(profile._json.picture)
                const insertSql = `
          INSERT INTO spotify.users (username, email, googleid,avatar)
          VALUES ($1, $2, $3, $4)
        `;
                const insertParams = [profile.displayName, profile._json.email, profile.id, avatar.url];
                const newUser = await pool.query(insertSql, insertParams);
                

                // 4. Check if user created.
                const sql3 = `SELECT USERNAME,EMAIL,avatar FROM spotify.users
                WHERE email = $1`
                const parameters3 = [profile._json.email]
                const savedUser = await pool.query(sql3, parameters3)


                // 5. Attach everything to req.user
                done(null, savedUser.rows[0]);
            } catch (err) {
                done(err, null);
            }
        }
    )
);


export default passport