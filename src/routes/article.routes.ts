import { Router } from "express";
import { ArticleController } from "../controllers";
import { articleValidator } from "../validators";
import { asyncHandler } from "../middlewares/handlers.middleware";
import { checkAuth } from "../middlewares";


const router = Router();

router.use( checkAuth );

router.post( "/", articleValidator.postArticle, asyncHandler( ArticleController.postArticle ) );
router.get( "/", articleValidator.getAllArticles, asyncHandler( ArticleController.getArticles ) );
router.put( "/:id", articleValidator.updateArticle, asyncHandler( ArticleController.updateArticle ) );
router.delete( "/:id", articleValidator.ArticleById, checkAuth, asyncHandler( ArticleController.deleteArticle ) );

export default router;

