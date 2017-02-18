class ShortenersController < ApplicationController
    def index
        shorteners = Shortener.all
        render json: shorteners, status: :ok
    end

    def show
        shortener = Shortener.find(params[:id])
        if shortener
            render json: shortener, status: :ok
        else
            render status: :unprocessable_entity
        end
    end

    def redirect
        shortener = Shortener.where(slug: params[:slug]).first
        if shortener
            shortener.increment!(:count)
            render json: shortener, status: :ok
        else
            render status: :unprocessable_entity
        end
    end

    def create
        if Shortener.exists?(given_url: shortener_params[:given_url])
            error = {:msg => 'exist',:status => 'error'}
            render json: error
        elsif shortener_params[:given_url].include? ENV["url_not_valid"]
            error = {:msg => 'not valid',:status => 'error'}
            render json: error
        else
            shortener = Shortener.new(shortener_params)
            doc = Pismo::Document.new(shortener.given_url)
            shortener.title = doc.title
            if shortener.save
                render json: shortener, status: :created 
            else
                render json: shortener.errors, status: :unprocessable_entity
            end
        end
    end

    def destroy
        shortener = Shortener.find(params[:id])
        if shortener.destroy
            render :nothing, status: :ok
        else
            render json: shortener.errors, status: :unprocessable_entity
        end
    end

    def get_shorteners
        shortener_ids = JSON.parse params[:shortener_ids]
        shorteners = Shortener.where(id: shortener_ids)
        render json: shorteners, status: :ok
    end

    def get_total_clicks
        shortener_ids = JSON.parse params[:shortener_ids]
        result = Shortener.select("sum(count) as total_clicks").where(id: shortener_ids)
        render json: result[0], status: :ok
    end

    private
    def shortener_params
        params.require(:shortener).permit(:given_url, :count)
    end
end
